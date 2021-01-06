package eternal.fire.xdcov.covid;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import eternal.fire.xdcov.entity.Message;
import eternal.fire.xdcov.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

@Component
public class Covid {
    private final static Logger logger = LoggerFactory.getLogger(Covid.class);

    private final static String LOGIN_URL = "https://xxcapp.xidian.edu.cn/uc/wap/login/check";
    private final static String UPLOAD_URL = "https://xxcapp.xidian.edu.cn/xisuncov/wap/open-report/save";

    private final static HttpClient httpClient = HttpClient.newBuilder().build();

    private final UserService userService;
    private final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public Covid(UserService userService) {
        this.userService = userService;
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    // 每小时执行一次
    @Scheduled(fixedRate = 1000 * 60 * 60)
    private void uploadData() {
        var users = userService.getUsers();
        for (var user : users) {
            uploadData(user.getId(), user.getPassword());
        }
    }

    public void uploadData(String id, String password) {
        try {
            String cookie = getCookieByLogIn(id, password);
            String data = getDataFromFile();
            HttpRequest request = HttpRequest.newBuilder(new URI(UPLOAD_URL))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .headers("Cookie", cookie)
                    .POST(HttpRequest.BodyPublishers.ofString(data, StandardCharsets.UTF_8))
                    .build();
            var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            Message message = mapper.readValue(response.body(), Message.class);
            if (message.getE() == 0) {
                logger.info("id:{},password:{},上报成功", id, password);
            } else {
                logger.info("id:{},password:{},上报失败：{}", id, password, message.getM());
            }
        } catch (IOException | InterruptedException | URISyntaxException | RuntimeException e) {
            e.printStackTrace();
        }
    }

    private String getCookieByLogIn(String id, String password) throws IOException, InterruptedException, URISyntaxException {
        String body = String.format("username=%s&password=%s", id, password);
        HttpRequest request = HttpRequest.newBuilder(new URI(LOGIN_URL))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(body, StandardCharsets.UTF_8))
                .build();
        var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        Message message = mapper.readValue(response.body(), Message.class);
        if (message.getE() == 0) {
            var cookies = response.headers().allValues("set-cookie");
            StringBuilder ans = new StringBuilder();
            for (var cookie : cookies) {
                ans.append(purifyCookie(cookie));
            }
            return ans.toString();
        }
        throw new RuntimeException("登录失败，请检查用户名和密码是否正确。ID：" + id + ", Password:" + "password");
    }

    private String purifyCookie(String cookie) {
        int index = cookie.indexOf(';');
        return cookie.substring(0, index + 2);
    }

    private String getDataFromFile() throws IOException {
        InputStreamReader reader = new InputStreamReader(Covid.class.getResourceAsStream("/data.json"));
        StringBuilder data = new StringBuilder();
        char[] buffer = new char[1024];
        if (reader.read(buffer) != -1) {
            for (var ch : buffer) {
                data.append(ch);
            }
        }
        return data.toString();
    }

    // 是否可以登录成功
    public static boolean test(String id, String password) {
        try {
            String body = String.format("username=%s&password=%s", id, password);
            HttpRequest request = HttpRequest.newBuilder(new URI(LOGIN_URL))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(body, StandardCharsets.UTF_8))
                    .build();
            var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            Message message = mapper.readValue(response.body(), Message.class);
            return message.getE() == 0;
        } catch (URISyntaxException | IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return false;
    }
}

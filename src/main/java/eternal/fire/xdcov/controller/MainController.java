package eternal.fire.xdcov.controller;

import eternal.fire.xdcov.covid.Covid;
import eternal.fire.xdcov.entity.User;
import eternal.fire.xdcov.service.CipherUtil;
import eternal.fire.xdcov.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;

@Controller
public class MainController {
    private static final Logger logger = LoggerFactory.getLogger(MainController.class);
    private final UserService userService;
    private final CipherUtil cipherUtil;

    @Autowired
    public MainController(UserService userService, CipherUtil cipherUtil) {
        this.userService = userService;
        this.cipherUtil = cipherUtil;
    }

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("publicKey", cipherUtil.getPublicKey());
        return "home";
    }

    @PostMapping("/submit")
    @ResponseBody
    public String submit(@RequestParam("action") String value, @RequestParam("id") String id, @RequestParam("password") String password) throws BadPaddingException, IllegalBlockSizeException {
        id = cipherUtil.decrypt(id);
        password = cipherUtil.decrypt(password);
        logger.info("新的用户请求：id为{}, password为{}", id, password);
        switch (value) {
            case "submit" -> {
                User user = userService.getUser(id);
                if (user != null) {
                    return "提交失败，您已提交过";
                }

                if (!Covid.test(id, password)) {
                    return "提交失败，请检查学号和密码是否正确！";
                }

                userService.addUser(id, password);
                return "提交成功！";
            }
            case "cancel" -> {
                if (userService.deleteUser(id, password) != 0) {
                    return "取消成功！";
                } else {
                    return "取消失败，请检查学号和密码是否正确！";
                }
            }
        }
        return "unknown error";
    }
}

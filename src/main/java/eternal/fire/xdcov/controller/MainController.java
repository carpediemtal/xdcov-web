package eternal.fire.xdcov.controller;

import eternal.fire.xdcov.covid.Covid;
import eternal.fire.xdcov.entity.User;
import eternal.fire.xdcov.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class MainController {
    private final UserService userService;

    @Autowired
    public MainController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @PostMapping("/submit")
    public String submit(@RequestParam("action") String value, @RequestParam("id") String id, @RequestParam("password") String password, RedirectAttributes redirectAttributes) {
        switch (value) {
            case "submit" -> {
                User user = userService.getUser(id);
                if (user != null) {
                    redirectAttributes.addFlashAttribute("info", "提交失败，您已提交过");
                    break;
                }

                if (!Covid.test(id, password)) {
                    redirectAttributes.addFlashAttribute("info", "提交失败，请检查学号和密码是否正确！");
                    break;
                }

                userService.addUser(id, password);
                redirectAttributes.addFlashAttribute("info", "提交成功！");
            }
            case "cancel" -> {
                if (userService.deleteUser(id, password) != 0) {
                    redirectAttributes.addFlashAttribute("info", "取消成功！");
                } else {
                    redirectAttributes.addFlashAttribute("info", "取消失败，请检查学号和密码是否正确！");
                }
            }
        }
        return "redirect:/";
    }
}

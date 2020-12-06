package eternal.fire.xdcov;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class XdcovApplication {

    public static void main(String[] args) {
        SpringApplication.run(XdcovApplication.class, args);
    }

}

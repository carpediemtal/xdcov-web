package eternal.fire.xdcov.service;

import eternal.fire.xdcov.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.util.List;

@Component
public class UserService {
    private final static Logger logger = LoggerFactory.getLogger(UserService.class);
    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<User> rowMapper = new BeanPropertyRowMapper<>(User.class);

    @Autowired
    public UserService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void addUser(String id, String password) {
        User user = new User(id, password);
        jdbcTemplate.update("insert into user (id, password) values (?, ?)", user.getId(), user.getPassword());
    }

    public List<User> getUsers() {
        return jdbcTemplate.query("select * from user", rowMapper);
    }

    public int deleteUser(String id, String password) {
        return jdbcTemplate.update("delete from user where id = ? and password = ?", id, password);
    }

    public User getUser(String id) {
        try {
            return jdbcTemplate.queryForObject("select * from user where id = ?", rowMapper, id);
        } catch (DataAccessException e) {
            logger.info("没有找到对应的User");
            e.printStackTrace();
            return null;
        }
    }
}

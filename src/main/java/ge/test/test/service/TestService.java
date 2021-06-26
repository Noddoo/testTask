package ge.test.test.service;

import ge.test.test.dao.TestDao;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {
    @Autowired
    TestDao testDao;
    public void insertAnswers(List<JSONObject> answers) {
        testDao.insertAnswers(answers);
    }
}

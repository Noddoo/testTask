package ge.test.test.service;

import ge.test.test.dao.TestDao;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

@org.springframework.stereotype.Service
public class TestService {
    @Autowired
    TestDao testDao;
    public void insertAnswers(List<JSONObject> answers) {
        testDao.insertAnswers(answers);
    }
}

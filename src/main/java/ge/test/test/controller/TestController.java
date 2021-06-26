package ge.test.test.controller;

import ge.test.test.service.TestService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TestController {
    @Autowired
    TestService testService;
    @GetMapping("sendAnswers")
    public void test(String answers) {
        List<JSONObject> results = new ArrayList<>();
        JSONArray jsonArray = new JSONArray(answers);
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject explrObject = jsonArray.getJSONObject(i);
            results.add(explrObject);
        }
        testService.insertAnswers(results);
    }
}

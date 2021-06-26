package ge.test.test.controller;

import ge.test.test.service.TestService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class TestController {
    @Autowired
    TestService testService;
    @GetMapping("sendAnswers")
    public void test(String a) {
        List<JSONObject> results = new ArrayList<>();
        JSONArray jsonArray = new JSONArray(a);
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject explrObject = jsonArray.getJSONObject(i);
            Map<String,String> myMap = new HashMap<>();
            results.add(explrObject);
        }
        testService.insertAnswers(results);
    }
}

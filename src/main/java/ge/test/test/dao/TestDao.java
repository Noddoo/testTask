package ge.test.test.dao;

import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.List;
import java.util.Map;

@Repository
public class TestDao {
    public void insertAnswers(List<JSONObject> answers) {
        try
        {
            // create a mysql database connection
            String myUrl = "jdbc:mysql://localhost/test";
            Connection conn = DriverManager.getConnection(myUrl, "root", "nodo");

            for (int i = 0; i < answers.size(); i++) {
                String query = " insert into answers (value, time)"
                        + " values (?, ?)";

                PreparedStatement preparedStmt = conn.prepareStatement(query);
                preparedStmt.setString (1, String.valueOf(answers.get(i).get("ans")));
                preparedStmt.setString (2, String.valueOf(answers.get(i).get("time")));

                // execute the preparedstatement
                preparedStmt.execute();
            }

            conn.close();
        }
        catch (Exception e)
        {
            System.err.println("Got an exception!");
            System.err.println(e.getMessage());
        }
    }
}

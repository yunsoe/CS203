package com.example.g2t6.news;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


@RestController
@CrossOrigin
@RequestMapping("api/v1/CMS")
public class WebScraperController {
    

    private NewsRepository newsRepo;

    @GetMapping("/news")
    public String webParsing() {

        ArrayList<String> overallPoints = new ArrayList<>();
        try {

            // Document d = Jsoup.connect("https://www.gobusiness.gov.sg/safemanagement/sector").timeout(6000).get();
            // Elements body = d.select("ul.jekyllcodex_accordion");
            
            // for (Element e: body.select("li")) {
            //     String title = e.select("label").text();

            //     overallPoints.add(title);


            //     for (Element links: e.select("a")) {
            //         overallPoints.add(links.attr("href"));
            //         links.nextElementSibling();
            //     }
            // }

            Document d = Jsoup.connect("https://www.mti.gov.sg/Newsroom/Updates-on-COVID-19").timeout(6000).get();
            Elements body = d.select("div.article-content > ul");

            for (Element e: body.select("li")) {

                String link = e.select("a").attr("href");
                String desc = e.text();
                
                overallPoints.add(desc);
                overallPoints.add(link);
            }
           


        } catch (Exception e) {

        }

        Gson gson = new Gson();

        
        String json = gson.toJson(overallPoints);

        return json;
    }
}
package com._CServices.IVR_api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

    @RequestMapping(value = "/{path:^(?!api|static).*}/**")
    public String redirect() {
        return "forward:/index.html";
    }
}

package com._CServices.IVR_api.controller;

import com._CServices.IVR_api.dto.request.MsisdnRequest;
import com._CServices.IVR_api.dto.response.MessageResponse;
import com._CServices.IVR_api.service.BdrService;
import com._CServices.IVR_api.service.ClientsCrmHistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/msisdn")
@RequiredArgsConstructor
public class MsisdnController {
    private final ClientsCrmHistService clientsCrmHistService;
    private final BdrService bdrService;


    @PutMapping("/reset")
    @PreAuthorize("hasAuthority('reset:msisdn')")
    public ResponseEntity<MessageResponse> resetNbCalls(@RequestBody @Valid MsisdnRequest msisdnRequest) {
        boolean areNbCallsZero = bdrService.areNbCallsZero(msisdnRequest.getMsisdn());
        MessageResponse messageResponse = new MessageResponse("");
        if (!areNbCallsZero) {
            bdrService.resetNbCalls(msisdnRequest.getMsisdn());
            messageResponse.setMessage("Le nombre d'appels pour MSISDN: " + msisdnRequest.getMsisdn()+ " est réinitialisé");
        }
        else {
            messageResponse.setMessage("Le nombre d'appels pour MSISDN: " + msisdnRequest.getMsisdn()+ " est déja 0");
        }

        return ResponseEntity.ok(messageResponse);
    }

    //Blacklist MSISDN
    @PutMapping("/blacklist")
    @PreAuthorize("hasAuthority('blacklist:msisdn')")
    public ResponseEntity<MessageResponse> blacklistMsisdn(@RequestBody @Valid MsisdnRequest msisdnRequest) {
        boolean isBlacklisted = clientsCrmHistService.isMsisdnBlacklisted(msisdnRequest.getMsisdn());
        MessageResponse messageResponse = new MessageResponse("");
        if(!isBlacklisted) {
            clientsCrmHistService.blacklistMsisdn(msisdnRequest.getMsisdn());
            messageResponse.setMessage("le MSISDN " + msisdnRequest.getMsisdn() +" a été Blacklisté");
        }
        else {

            messageResponse.setMessage("le MSISDN " + msisdnRequest.getMsisdn() +" est déja Blacklisté");
        }
        return ResponseEntity.ok(messageResponse);
    }

    //Whitelist MSISDN
    @PutMapping("/whitelist")
    @PreAuthorize("hasAuthority('whitelist:msisdn')")
    public ResponseEntity<MessageResponse> whitelistMsisdn(@RequestBody MsisdnRequest msisdnRequest) {
        boolean isWhitelisted = clientsCrmHistService.isMsisdnWhiteListed(msisdnRequest.getMsisdn());
        MessageResponse messageResponse = new MessageResponse("");
        if(isWhitelisted) {
            messageResponse.setMessage("le MSISDN " + msisdnRequest.getMsisdn() +" est déja Whitelistéé");
        }
        else {
            clientsCrmHistService.whitelistMsisdn(msisdnRequest.getMsisdn());
            messageResponse.setMessage("le MSISDN " + msisdnRequest.getMsisdn() +" a été Whitelisté");
        }
        return ResponseEntity.ok(messageResponse);
    }

    // Check if MSISDN is blacklisted
    @GetMapping("/is-blacklisted")
    @PreAuthorize("hasAuthority('verify:msisdn')")
    public ResponseEntity<MessageResponse> isMsisdnBlacklisted(@RequestParam String msisdn) {
        boolean isBlacklisted = clientsCrmHistService.isMsisdnBlacklisted(msisdn);
        MessageResponse messageResponse = MessageResponse.builder()
                .message("le MSISDN " + msisdn +" est Blacklisté")
                .build();
        if (!isBlacklisted) {
            messageResponse.setMessage("le MSISDN " + msisdn +" n'est pas Blacklisté");
            return ResponseEntity.ok(messageResponse);

        }
        return ResponseEntity.ok(messageResponse);

    }
}

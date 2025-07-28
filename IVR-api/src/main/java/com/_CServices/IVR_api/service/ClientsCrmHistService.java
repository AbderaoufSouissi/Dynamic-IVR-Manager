package com._CServices.IVR_api.service;

import com._CServices.IVR_api.audit.AuditLoggingService;
import com._CServices.IVR_api.dao.ClientsCrmHistRepository;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import com._CServices.IVR_api.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClientsCrmHistService {

    private final ClientsCrmHistRepository clientsCrmHistRepository;
    private final AuditLoggingService auditLoggingService;

    @Transactional
    public void blacklistMsisdn(String msisdn) {
        log.info("inside blacklistMsisdn()");
        if(!clientsCrmHistRepository.existsByMsisdn(msisdn)) {
            throw new ResourceNotFoundException("Msisdn: "+msisdn+" not found");
        }
        if(!clientsCrmHistRepository.isMsisdnBlacklisted(msisdn)) {
            int updatedRows = clientsCrmHistRepository.blacklistMsisdn(msisdn);
            if(updatedRows == 0 ){
                throw new IllegalArgumentException("Cannot Blacklist MSISDN: " + msisdn);
            }

        }
        auditLoggingService.logAction(
                ActionType.BLACKLIST_MSISDN.toString(),
                String.valueOf(EntityType.MSISDN),
                null,
                msisdn
        );

    }
    @Transactional
    public void whitelistMsisdn(String msisdn) {
        log.info("inside whitelistMsisdn()");
        if(!clientsCrmHistRepository.existsByMsisdn(msisdn)) {
            throw new ResourceNotFoundException("Msisdn: "+msisdn+" not found");
        }
        if(!clientsCrmHistRepository.isMsisdnWhitelisted(msisdn)) {
            int updatedRows = clientsCrmHistRepository.whitelistMsisdn(msisdn);
            if(updatedRows == 0 ){
                throw new IllegalArgumentException("Cannot Whitelist MSISDN: " + msisdn);
            }

        }
        auditLoggingService.logAction(
                ActionType.WHITELIST_MSISDN.toString(),
                String.valueOf(EntityType.MSISDN),
                null,
                msisdn
        );

    }

    public boolean isMsisdnBlacklisted(String msisdn) {
        if(!clientsCrmHistRepository.existsByMsisdn(msisdn)) {
            throw new ResourceNotFoundException("Msisdn: "+msisdn+" not found");
        }
        return clientsCrmHistRepository.isMsisdnBlacklisted(msisdn);
    }

    public boolean isMsisdnWhiteListed(String msisdn) {
        if(!clientsCrmHistRepository.existsByMsisdn(msisdn)) {
            throw new ResourceNotFoundException("Msisdn: "+msisdn+" not found");
        }
        return clientsCrmHistRepository.isMsisdnWhitelisted(msisdn);
    }
}

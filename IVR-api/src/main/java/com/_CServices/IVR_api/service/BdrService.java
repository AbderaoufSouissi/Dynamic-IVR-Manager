package com._CServices.IVR_api.service;

import com._CServices.IVR_api.audit.AuditLoggingService;
import com._CServices.IVR_api.dao.BdrRepository;
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
public class BdrService {

    private final BdrRepository bdrRepository;
    private final AuditLoggingService auditLoggingService;

    @Transactional
    public void resetNbCalls(String msisdn){

        log.info("inside resetNbCalls()");
        if(!bdrRepository.existsByMsisdn(msisdn)){
           throw new ResourceNotFoundException("Msisdn: "+msisdn+" not found");
        }

        int updatedRows = bdrRepository.resetNbCalls(msisdn);
        if(updatedRows == 0 ){
            throw new IllegalArgumentException("No record found for MSISDN: " + msisdn);
        }

        auditLoggingService.logAction(
                ActionType.RESET_NB_CALLS.toString(),
                String.valueOf(EntityType.MSISDN),
                null,
                msisdn
        );

    }

    public boolean areNbCallsZero(String msisdn){
        if(!bdrRepository.existsByMsisdn(msisdn)){
            throw new ResourceNotFoundException("Msisdn: "+msisdn+" not found");
        }
        return bdrRepository.areNbCallsZero(msisdn);


    }



}

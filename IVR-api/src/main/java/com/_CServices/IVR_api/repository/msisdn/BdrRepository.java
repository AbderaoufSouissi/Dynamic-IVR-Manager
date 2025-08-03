package com._CServices.IVR_api.repository.msisdn;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BdrRepository {
    private final JdbcTemplate jdbcTemplate;



    public int resetNbCalls(String msisdn){
        String sql = "UPDATE CCADMIN.BDR SET NBAPPELS = 0, NBAPPELS_CC = 0 WHERE MSISDN = ?";
        return jdbcTemplate.update(sql, msisdn);
    }

    public boolean existsByMsisdn(String msisdn) {
        String sql = "SELECT COUNT(*) FROM CCADMIN.BDR WHERE MSISDN = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, msisdn);
        return count != null && count > 0;
    }

    public boolean areNbCallsZero(String msisdn) {
        String sql = "SELECT COUNT(*) FROM CCADMIN.BDR WHERE MSISDN = ? AND NBAPPELS = 0 AND NBAPPELS_CC = 0";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, msisdn);
        return count != null && count > 0;
    }



}

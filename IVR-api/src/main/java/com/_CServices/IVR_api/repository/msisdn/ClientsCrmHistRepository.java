package com._CServices.IVR_api.repository.msisdn;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ClientsCrmHistRepository {
    private final JdbcTemplate jdbcTemplate;

    public boolean existsByMsisdn(String msisdn) {
        String sql = "SELECT COUNT(*) FROM CCADMIN.CLIENTS_CRM_HIST  hist,CCADMIN.CLIENTS_CRM_LOG_MAJ maj " +
                "WHERE HIST.DATE_MAJ=MAJ.DATE_MAJ AND MSISDN = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, msisdn);
        return count != null && count > 0;
    }

    public int blacklistMsisdn(String msisdn) {
        String sql = "UPDATE CCADMIN.CLIENTS_CRM_HIST SET BLACKLIST = 1 WHERE MSISDN = ?";
        return jdbcTemplate.update(sql, msisdn);
    }

    public int whitelistMsisdn(String msisdn) {
        String sql = "UPDATE CCADMIN.CLIENTS_CRM_HIST SET BLACKLIST = 0 WHERE MSISDN = ?";
        return jdbcTemplate.update(sql, msisdn);
    }


    public boolean isMsisdnBlacklisted(String msisdn) {
        String sql = "SELECT COUNT(*) FROM CCADMIN.CLIENTS_CRM_HIST WHERE MSISDN = ? AND BLACKLIST = 1";

        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, msisdn);
        return count != null && count > 0;
    }

    public boolean isMsisdnWhitelisted(String msisdn) {
        String sql = "SELECT COUNT(*) FROM CCADMIN.CLIENTS_CRM_HIST WHERE MSISDN = ? AND BLACKLIST = 0";

        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, msisdn);
        return count != null && count > 0;
    }
}

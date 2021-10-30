package com.example.g2t6.swabTestDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface SwabTestDetailRepository extends JpaRepository<SwabTestDetail, Long>{

    List<SwabTestDetail> findByuserEmail(String userEmail);
    Optional<SwabTestDetail> findByIdAndUserEmail(Long id,String userEmail);
}

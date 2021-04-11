<?php

namespace App\Repository;

use App\Entity\Bacteria;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Bacteria|null find($id, $lockMode = null, $lockVersion = null)
 * @method Bacteria|null findOneBy(array $criteria, array $orderBy = null)
 * @method Bacteria[]    findAll()
 * @method Bacteria[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BacteriaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Bacteria::class);
    }

    // /**
    //  * @return Bacteria[] Returns an array of Bacteria objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Bacteria
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

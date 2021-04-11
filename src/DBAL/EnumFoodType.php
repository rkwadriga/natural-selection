<?php declare(strict_types=1);
/**
 * Created 2021-04-11
 * Author Dmitry Kushneriov
 */

namespace App\DBAL;

use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\AbstractPlatform;

class EnumFoodType extends Type
{
    public const ENUM_TYPE = 'enumFoodType';

    public const TYPE_FOOD = 'Food';

    public function getAllowedValues(): array
    {
        return [self::TYPE_FOOD];
    }

    public function getSQLDeclaration(array $column, AbstractPlatform $platform): string
    {
        return sprintf("ENUM('%s')", implode("','", $this->getAllowedValues()));
    }

    public function getName(): string
    {
        return self::ENUM_TYPE;
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform): string
    {
        if (!in_array($value, $this->getAllowedValues())) {
            throw new \InvalidArgumentException("Invalid type");
        }
        return $value;
    }
}
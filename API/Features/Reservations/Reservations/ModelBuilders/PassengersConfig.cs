using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Reservations.Reservations {

    internal class PassengersConfig : IEntityTypeConfiguration<Passenger> {

        public void Configure(EntityTypeBuilder<Passenger> entity) {
            // PK
            entity.Property(x => x.ReservationId).IsFixedLength().HasMaxLength(36).IsRequired(true);
            // FKs
            entity.Property(x => x.GenderId).IsRequired(true);
            entity.Property(x => x.NationalityId).IsRequired(true);
            entity.Property(x => x.OccupantId).HasDefaultValue(2);
            // Fields
            entity.Property(x => x.Lastname).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.Firstname).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.Birthdate).HasColumnType("date").HasMaxLength(10).IsRequired(true);
            entity.Property(x => x.PassportNo).HasMaxLength(32).IsRequired(true);
            entity.Property(x => x.PassportExpireDate).HasColumnType("date").HasMaxLength(10).IsRequired(true);
            entity.Property(x => x.Remarks).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.SpecialCare).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.IsBoarded);
        }

    }

}
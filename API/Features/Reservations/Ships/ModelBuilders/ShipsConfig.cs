using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Reservations.Ships {

    internal class ShipsConfig : IEntityTypeConfiguration<Ship> {

        public void Configure(EntityTypeBuilder<Ship> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // FKs
            entity.Property(x => x.ShipOwnerId).IsRequired(true);
            // Fields
            entity.Property(x => x.Description).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.Abbreviation).HasMaxLength(5).IsRequired(true);
            entity.Property(x => x.IMO).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.Flag).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.RegistryNo).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.Manager).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.ManagerInGreece).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.Agent).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.IsActive);
            // Metadata
            entity.Property(x => x.PostAt).HasMaxLength(19).IsRequired(true);
            entity.Property(x => x.PostUser).HasMaxLength(255).IsRequired(true);
            entity.Property(x => x.PutAt).HasMaxLength(19);
            entity.Property(x => x.PutUser).HasMaxLength(255);
        }

    }

}
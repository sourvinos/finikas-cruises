namespace API.Features.Reservations.Manifest {

    public interface IManifestRepository {

        ManifestFinalVM Get(bool onlyBoarded, string date, int destinationId, int[] portIds, int? shipId);

    }

}
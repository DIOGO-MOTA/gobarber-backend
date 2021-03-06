import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmenstRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmenstRepository: FakeAppointmenstRepository;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointmenstRepository = new FakeAppointmenstRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProviderAppointments = new ListProviderAppointmentsService(
            fakeAppointmenstRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list the appointments on a specific day', async () => {
        const appointment1 = await fakeAppointmenstRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 4, 20, 14, 0, 0),
        });
        const appointment2 = await fakeAppointmenstRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 4, 20, 15, 0, 0),
        });

        const appointments = await listProviderAppointments.execute({
            provider_id: 'provider',
            year: 2021,
            month: 5,
            day: 20,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});

import { TestBed, inject } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
describe('AuthGuardService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [AuthGuardService]
        });
    });
    it('should ...', inject([AuthGuardService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=../../../../src/app/services/auth-guard.service.spec.js.map
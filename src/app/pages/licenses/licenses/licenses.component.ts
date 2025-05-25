import { Component, OnInit } from '@angular/core';
import { LicenseService } from '../../../services/licenses/license.service';
import { BehaviorSubject, combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import { PageModel } from '../../../models/page-model';
import { License } from '../../../models/license';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from "../../../components/paginator/paginator.component";

@Component({
  selector: 'app-licenses',
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './licenses.component.html',
  styleUrl: './licenses.component.css'
})
export class LicensesComponent implements OnInit {

  licensePageModel$!: Observable<PageModel<License>>;
  licenseList$!: Observable<License[]>;
  private licenseListSnapshot: License[] = [];

  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  pageSize$ = new BehaviorSubject<number>(10);

  currentPage: number = 0;
  size: number = 10;
  totalPages: number = 0
  totalElements: number = 0;

  constructor(private licenseService: LicenseService) { }

  ngOnInit(): void {
    this.currentPage$.subscribe(page => this.currentPage = page);
    this.pageSize$.subscribe(size => this.size = size)

    this.licensePageModel$ = combineLatest([
      this.currentPage$,
      this.pageSize$
    ]).pipe(
      switchMap(([page, size]) => this.licenseService.findAll(page, size)),
      tap((pageMode: PageModel<License>) => {
        this.totalElements = pageMode.page.totalElements;
        this.totalPages = pageMode.page.totalPages;
      })
    )
    this.licenseList$ = this.licensePageModel$.pipe(
      map((licensePageModel: PageModel<License>) => licensePageModel._embedded["licenseList"]),
      tap((licenses: License[]) => this.licenseListSnapshot = licenses)
    )
  }

  // pagination

  onPageChange(page: number) {
    this.currentPage$.next(page);
  }

  onPageSizeChange(size: number) {
    this.pageSize$.next(size);
    this.currentPage$.next(0);
  }

  // selection

  private _selectedLicenseIds: Set<number> = new Set<number>();

  get selectedLicenseIds(): Set<number> {
    return this._selectedLicenseIds;
  }

  toggleSelectAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.licenseListSnapshot.forEach(license => {
      if (checked) this.selectedLicenseIds.add(license.id!);
      else this.selectedLicenseIds.delete(license.id!);
    });
    console.log(this.selectedLicenseIds);
  }

  isAllSelected(): boolean {
    return this.licenseListSnapshot.length > 0 && this.licenseListSnapshot.every(l => this.selectedLicenseIds.has(l.id!));
  }

  isSomeSelected(): boolean {
    return this.licenseListSnapshot.some(l => this.selectedLicenseIds.has(l.id!));
  }

  isLicenseSelected(id: number): boolean {
    return this.selectedLicenseIds.has(id);
  }

  toggleSelect(id: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) this.selectedLicenseIds.add(id);
    else this.selectedLicenseIds.delete(id);
    console.log(this.selectedLicenseIds);
  }

}

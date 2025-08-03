import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { HotmartTrustCarouselComponent } from '../../../components/hotmart-trust-carousel/hotmart-trust-carousel';
import { ASMROfferComponent } from "../../../components/special-offer/asmr/asmr-offer.component";
import { asmrItems } from '../../../data/benefitsItems';
import { packASMR } from '../../../data/packASMR';


@Component({
  selector: 'app-prompts-asmr',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HotmartTrustCarouselComponent, ASMROfferComponent],
  templateUrl: './prompts-amsr.component.html',
  styleUrls: ['../prompts-ia.component1.scss', '../prompts-ia.component2.scss', '../prompts-ia.component3.scss'],
})
export class PromptsASMRComponent implements OnInit, OnDestroy {
  packASMR = packASMR;

  packItemsList1 = this.shufflePackItems();
  packItemsList2 = this.shufflePackItems();

  shufflePackItems() {
    const array = [...packASMR];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  currentIndex = 0;

  benefits = asmrItems;
  benefitIndex = 0;
  private benefitInterval: any;

  // Variables para swipe táctil
  private touchStartX: number = 0;
  private touchEndX: number = 0;

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const threshold = 40; 
    if (deltaX > threshold) {
      this.prevBenefit();
    } else if (deltaX < -threshold) {
      this.nextBenefit();
    }
  }

  getTransform() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  getBenefitTransform() {
    return `translateX(-${this.benefitIndex * 100}%)`;
  }

  nextBenefit() {
    if (this.benefitIndex < this.benefits.length - 1) {
      this.benefitIndex++;
    }
  }

  prevBenefit() {
    if (this.benefitIndex > 0) {
      this.benefitIndex--;
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.benefitInterval) {
      clearInterval(this.benefitInterval);
    }
  }

  nextBenefitAuto() {
    this.benefitIndex = (this.benefitIndex + 1) % this.benefits.length;
  }

  scrollToPack() {
    const el = document.getElementById('pack-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}





import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import InfoBar from '@/features/champions/InfoBar';
import LinkToChampion from '@/features/champions/LinkToChampion';
import Slider from '@/features/champions/Slider';
import Error from '@/features/Error';
import MainLayout from '@/features/layout/MainLayout';

import { Link } from '@/i18n/navigation';
import { getChampion } from '@/utils/api/apiRiot';
import { DEFAULT_LOCALE } from '@/utils/constantes';

import styles from '@/styles/Champion.module.scss';

type Props = {
  params: Promise<{ locale: string; name: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale = DEFAULT_LOCALE, name } = await params;
  const champion = await getChampion(locale, name);
  return { title: champion ? `WiwottoF - ${champion.name}` : 'WiwottoF' };
}

export default async function ChampionPage({ params }: Props) {
  const { locale = DEFAULT_LOCALE, name } = await params;
  const champion = await getChampion(locale, name);
  const t = await getTranslations('champions');

  if (!champion) {
    return <Error trans_key="errors.fetch-champion" />;
  }

  const { name: championName, tags, title, blurb, info, skins, moreChampions } = champion;

  return (
    <MainLayout>
      <div className={styles.coverWrapper}>
        <Image
          src={skins[0].centeredUrl}
          alt="cover"
          className={styles.cover}
          priority
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>
      <h1>{championName}</h1>
      <div className={styles.row}>
        <div className={styles.slider}>
          <div className={styles.sliderImage}>
            <Slider images={skins.map((skin) => skin.loadingUrl)} />
          </div>
        </div>
        <div className={styles.details}>
          <h2 className={styles.h2}>{title}</h2>
          <div className={styles.tagsWrapper}>
            {tags.map((tag) => (
              <Link key={tag} href={`/champions/${tag.toLowerCase()}`}>
                <span className={styles.tag} active="true">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <p className={styles.blurb}>{blurb}</p>
          <div className={styles.infos}>
            {Object.entries(info).map(([key, value]) => (
              <InfoBar key={key} label={key} value={value} type={key as UnionInfos} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.moreChampions}>
        <h2>{t('more-champions')}</h2>
        <div className={styles.championsWrapper}>
          {moreChampions.map(({ key, id, name, version }) => (
            <LinkToChampion key={key} id={id} name={name} version={version} styles={styles} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

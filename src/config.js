import irma from 'app/images/IMG_0356.jpeg';
import koali from 'app/images/DSC00577.jpeg';
import koali2 from 'app/images/DSC00578.jpeg';
import pumpkin from 'app/images/DSC00572.jpeg';
import lights from 'app/images/DSC00560.jpeg';
import pferd from 'app/images/DSC00579.jpeg';
import schwimmbad from 'app/images/schwimmbad.jpg';
import venedig from 'app/images/venedig.jpg';
import bank from 'app/images/DSC_1476.jpg';
import tour from 'app/images/tour.jpg';

import koala3 from 'app/images/jordan-whitt-EerxztHCjM8-unsplash.jpg';
import Raupe from 'app/images/C03_61369_Other-animals_runner-up.jpg';
import Wal from 'app/images/C06_56098_Underwater_winner.jpg';
import vogel from 'app/images/C11_60109_Youth_winner.jpg';
import koala4 from 'app/images/dan-kb-MojjJf8G0Gw-unsplash.jpg';

export const PUZZLE_FORMATS = {
    landscape: (100 / 4) * 3,
    square: 100,
    portrait: Number.parseFloat((100 / 3) * 4).toFixed(4),
};
export const FORMAT_CONTROLS = {
    landscape: 'Querformat',
    square: 'Quadrat',
    portrait: 'Hochformat',
};
export const SOURCES = {
    'Dicker Wal': Wal,
    'Bunte Raupe': Raupe,
    Vögel: vogel,
    'Koala schläft': koala3,
    'Koala schläft schon wieder': koala4,
    Irma: irma,
    Koala: koali,
    'Noch ein Koala': koali2,
    Halloween: pumpkin,
    'Festival of Lights': lights,
    Pferdchen: pferd,
    Schwimmbad: schwimmbad,
    Venedig: venedig,
    Bank: bank,
    Tour: tour,
};

/*
 * LINKS
 *

https://blog.addpipe.com/getusermedia-video-constraints/

*/

export type Email = {
  email: string;
};

export type BookingPost = {
  data: {
    book?: string;
    order: boolean;
    dateOrder: string;
    customer: string;
  };
};
export type BookingUpdate = {
  body: BookingPost;
  id?: string;
};

export type ResponseBooking = {
  data: {
    id: number;
    attributes: {
      order: boolean;
      text: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      dateOrder: string;
    };
  };
  meta: Record<string, any>;
};

export type IResetPassword = {
  password: string;
  passwordConfirmation: string;
  code: string;
};

export type ResponsePassword = {
  ok: boolean;
};

export type Error = {
  status: number;
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, any>;
  };
};

export type User = {
  id: number;
  username: string;
  email: string;
  provader: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
  password?: string;
};

export type UserWithToken = {
  jwt: string;
  user: User;
};

export type UserAutarization = {
  identifier: string;
  password: string;
};

export type Evaluation = {
  data: {
    rating: number;
    text: string;
    book?: string;
    user?: string;
  };
  comment?: Comments;
};

export type EvaluationUpdate = {
  id?: string;
  body: Evaluation;
};

export type ResponseEvaluation = {
  data: {
    id: number;
    attributes: {
      rating: number;
      text: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
  meta: Record<string, any>;
};

export type UserRegistration = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type Histories = {
  id?: number;
  userId?: number;
};

export type Image = {
  url: string;
};

export type Booking = {
  id?: number;
  order?: boolean;
  dateOrder?: string;
  customerId?: number;
  customerFirstName?: string;
  customerLastNam?: string;
};
export type Delivery = {
  id?: number | null;
  handed?: boolean;
  dateHandedFrom?: string;
  dateHandedTo?: string;
  recipientId?: number | null;
  recipientFirstName?: string;
  recipientLastName?: string;
};

export type Book = {
  issueYear?: string;
  rating?: number | null;
  title?: string;
  authors?: string[];
  image: { url: string };
  categories: string[];
  id: number | null;
  booking?: Booking;
  delivery?: Delivery;
  histories?: Histories[];
};

export type Categories = {
  name: string;
  id: number;
  path: string;
};

export type Comments = {
  id?: number;
  rating?: number;
  text?: string;
  createdAt: string;
  user: {
    commentUserId: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
};

export type BookId = {
  id?: number;
  title?: string;
  rating?: number;
  issueYear?: string;
  description: string;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  authors?: string[];
  images?: Image[];
  categories: string[];
  comments: Comments[];
  booking: Booking;
  delivery?: Delivery;
  histories?: Histories[];
};

export type UserUpdate = {
  id: string;
  body: User;
};

export type Role = {
  id: number;
  name: string;
  description: string;
  type: string;
};

export type InitialValues = {
  login: string;
  email: string;
  lastName: string;
  firstName: string;
  phone: string;
};

export type UserComments = {
  id: number;
  rating: number;
  text: string;
  bookId: number;
};

export type UserBook = {
  id: number;
  title: string;
  rating: number;
  issueYear: string;
  authors: string[];
  image: null | string;
};

export type UserData = {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  comments: UserComments[];
  avatar: string | null;
  booking: {
    id: number;
    order: boolean;
    dateOrder: string;
    book: UserBook;
  };

  delivery: {
    id: number;
    handed?: boolean;
    dateHandedFrom?: string;
    dateHandedTo?: string;
    book: UserBook;
  };
  history: {
    id: number;
    books: UserBook[];
  };
};

export type UserDataUpdate = {
  id: string;
  body: UserRegistration;
};

type Size = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null | string;
  width: number;
  height: number;
  size: number;
  url: string;
};

export type ImgRes = {
  id: number;
  name: string;
  alternativeText: null | string;
  caption: null | string;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: null | string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    large: Size;
    medium: Size;
    small: Size;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null | string;
  createdAt: string;
  updatedAt: string;
};

export type ImgUpdateUserReq = {
  id: string;
  body: {
    avatar: number;
  };
};

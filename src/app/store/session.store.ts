import { create } from 'zustand';

type State = {
  username: string;
  token: string;
  profile: string;
};

type Action = {
  setSession: (session: State) => void;
};

export const useSessionStore = create<State & Action>((set) => ({
  username: 'ruanvalente',
  token: 'kasygasyg2i219923dnw7=assdui32osd8920was1nidas7uh82',
  profile: 'ADMIN',
  setSession: (session) =>
    set(() => ({
      username: session.username,
      token: session.token,
      profile: session.profile
    }))
}));

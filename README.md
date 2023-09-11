# AngularTest

## Set Up instructions

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Design Patterns

### Singleton Pattern
All the services in the App follow a singleton pattern. They are provided in the root and injected to components when needed.

### Observer Pattern
 Observer design pattern, implemented using RxJS's BehaviorSubject for Menu (Open/close isBlur/notBlur) service and Settings service (local Storage interaction).

## Testing
All components and services have Unit Tests implemented using Jasmine and Karma. Further tests may be implemented, but basic functiionality is covered.

## Folder Structure and Code Organization

### Component structure

All the components are structured in two different types: views and components.  
**_Views_** represent actual pages of the application, while **_Components_** represent UI elements that can be reused in different views.

#### Views list

- **_Home_**: Starting page of the application. Next session is accessible. Term progress dashboard.
  - Injected dependencies: UserProgressService, SettingsService, MenuService
- **_Term Detail_**: Listing of the sessions in the term. Next session is accessible. Link back to home view.
  - Injected dependencies: UserProgressService, SettingsService, MenuService, Location, ActivatedRoute
- **_Before Start_**: Instructions page before starting a session. Link back to home view.

#### Component list

- **_Button_**:  
  - Prop list: 
    - isPrimary: boolean => Styled as Primary Button. Defaults to Secondary.
    - isActive: boolean => Styled as Active Button. Defaults to Inactive.
    - isIcon: boolean => Button with Icon. Defaults to false.
    - iconName: string => Icon file name.
    - buttonText: string => Text to be displayed inside the button.
    - rawToUrl: string => Url to redirect
- **_Icon_**:
  - Prop list:
    - iconName: string => File name for the icon.
- **_Menu_**:  
  - Does not take props. Contains the settings form.
  - Injected dependencies: SettingsService, MenuService
- **_Navbar_**:  
  - Does not take props. Toggles Menu.
  - Injected dependencies: MenuService
- **_Session-Card_**:
  - Prop list:
    - session: UserSession => Session data.
- **_Term-Card_**:
  - Prop list:
    - term: UserTerm => Term data. Computes and displays term progress graph.

### Services

- **_Content Service_**:  
  - Serves mock data: Courses, terms and sessions.
  - Methods: 
    - getAllCourses() : Course[]
    - getAllSessions() : Session[]
    - getTermsByCourse(courseId: string) : Term[]
    - getSessionsByCourseAndTerm(courseId: CourseId, termNumber: number) : Session[]
    - getSessionById(sessionId: string) : Session
- **_User Progress Service_**:  
  - Couples mock content data with user progress data to combine it for display.
  - Methods:
    - getTermProgressByCourse(courseId: CourseId): UserTerm[]
    - getSingleTermProgress(courseId: CourseId, termNumber: number): UserTerm
    - getSessionsProgressByCourseAndTerm(courseId: CourseId,termNumber: number): UserSession[]
    - getNextSession(): Session | null
    - saveNextSession(nextSession: Session): void
    - getRandomSession() : Session
    - getAfterNextSession(): Session | null
- **_Menu Service_**:  
  - Serves Menu state data: isMenuOpen & isBlurActive.
  - Methods:
    - toggleMenu() : void
    - closeMenu() : void
- **_Settings Service_**:  
  - Stores and retrieves settings data to Local Storage: idioma & curso.
  - Methods: 
    - getSettings(): Settings | null
    - saveSettings(settingsData: Settings) : void
    - getCourse(): CourseId

### Custom types
<pre>
Course {
  _id: CourseId;
  name: string;
}
</pre>
<pre>
Term {
  _id: string,
  courseId: CourseId,
  termNumber: number,
  totalSessions: number,
  sessions: string[]
}
</pre>
<pre>
Session {
 _id: string,
 courseId: CourseId,
 term: number,
 sessionNumber: number,
 title: string 
}
</pre>
<pre>
UserTerm {
  courseId: CourseId;
  termNumber: number;
  totalSessions: number;
  completedSessions: number;
  isCompleted: boolean;
}
</pre>
<pre>
UserSession {
  sessionId: string,
  sessionNumber: number;
  sessionTitle: string;
  isDone: boolean;
  isNext: boolean;
}
</pre>
<pre>
Settings {
  idioma: string;
  curso: CourseId;
}
</pre>